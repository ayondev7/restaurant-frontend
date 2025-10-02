"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/categoryService";

interface Dish {
  _id: string;
  name: string;
  category: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
}

interface CreateDishFormProps {
  onClose: () => void;
}

const createDish = async (formData: FormData): Promise<Dish> => {
  const response = await fetch("/api/dishes", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create dish");
  }
  return response.json();
};

const CreateDishForm: React.FC<CreateDishFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: categories = [], error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load categories");
    }
  }, [error]);

  const { mutate } = useMutation({
    mutationFn: createDish,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (newDish) => {
      toast.success("Food added successfully!");
      setName("");
      setCategory("");
      setImage(null);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Server error");
      setIsLoading(false);
    },
  });

  const validateImage = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, JPG, PNG, and WebP files are allowed.");
      return false;
    }
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      toast.error("File size must be 3MB or less.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateImage(file)) {
        setImage(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !image) {
      toast.error("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("image", image);
    mutate(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-20"
      onClick={onClose}
    >
      <div
        className="w-80 rounded-2xl p-6 z-30 bg-[rgba(104,104,104,0.7)] text-white shadow-lg border border-white border-opacity-20 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-xl font-medium mb-4">Add Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Food Name"
              className="w-full bg-transparent rounded-full border border-white bg-opacity-40 backdrop-blur-sm text-white px-4 py-2 focus:outline-none placeholder:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 relative">
            <div
              tabIndex={0}
              onClick={() => setShowCategoryOptions((prev) => !prev)}
              onBlur={() => {
                setTimeout(() => setShowCategoryOptions(false), 150);
              }}
              className={`w-full bg-transparent border border-white bg-opacity-40 backdrop-blur-sm text-white px-4 py-2 cursor-pointer focus:outline-none placeholder:text-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
                showCategoryOptions ? "h-48 rounded-md" : "h-11 rounded-full"
              }`}
            >
              <div className="flex-shrink-0">{category || "Food Category"}</div>
              {showCategoryOptions && (
                <div className="mt-2 flex flex-col gap-1 overflow-auto max-h-32">
                  {categories.map((cat) => (
                    <div
                      key={cat._id}
                      className="py-1 rounded cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setCategory(cat.name);
                        setShowCategoryOptions(false);
                      }}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            className={`relative mb-3 border-2 overflow-hidden px-4 bg-[rgba(210,51,47,0.25)] border-dashed rounded-full py-2 text-center cursor-pointer transition border-[#d2332f]`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                if (validateImage(file)) {
                  setImage(file);
                }
              }
            }}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {image ? (
              <p className="text-sm">{image.name}</p>
            ) : (
              <p className="text-sm">Upload or Drag image here</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-full transition duration-200 ${
              isLoading
                ? "bg-[#b42c29] cursor-not-allowed"
                : "bg-[#d2332f] cursor-pointer"
            }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDishForm;

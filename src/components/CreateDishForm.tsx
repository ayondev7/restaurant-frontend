'use client';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories } from "@/app/api/categories/route";

interface Dish {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface Category {
  id: string;
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

  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    onError: () => toast.error("Failed to load categories"),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createDish,
    onSuccess: (newDish) => {
      toast.success("Food added successfully!");
      setName("");
      setCategory("");
      setImage(null);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Server error");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
              disabled={isPending}
            />
          </div>
          <div className="mb-3 relative">
            <div
              tabIndex={0}
              onClick={() => setShowCategoryOptions((prev) => !prev)}
              onBlur={() => setShowCategoryOptions(false)}
              className={`w-full bg-transparent border border-white bg-opacity-40 backdrop-blur-sm text-white px-4 py-2 cursor-pointer focus:outline-none placeholder:text-white transition-all duration-300 ease-in-out overflow-hidden ${
                showCategoryOptions ? "h-48 rounded-md" : "h-11 rounded-full"
              }`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="flex-shrink-0">
                {category || "Food Category"}
              </div>
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
            className={`relative mb-3 border-2 overflow-hidden px-4 bg-[rgba(210,51,47,0.25)] border-dashed rounded-full py-2 text-center cursor-pointer transition ${
              dragActive ? "border-[#d2332f]" : "border-[#d2332f]"
            }`}
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
                setImage(e.dataTransfer.files[0]);
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
              disabled={isPending}
            />
            {image ? (
              <p className="text-sm">{image.name}</p>
            ) : (
              <p className="text-sm">Upload or Drag image here</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#d2332f] cursor-pointer text-white py-2 rounded-full transition duration-200 disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDishForm;
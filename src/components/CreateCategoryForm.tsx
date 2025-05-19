"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/lib/categoryService"; 

interface CreateCategoryFormProps {
  onClose: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created successfully!");
      setName("");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create category");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name cannot be empty");
    mutate(name);
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
        <h2 className="text-center text-xl font-medium mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent rounded-full border border-white bg-opacity-40 backdrop-blur-sm text-white px-4 py-2 focus:outline-none placeholder:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isPending}
            />
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

export default CreateCategoryForm;

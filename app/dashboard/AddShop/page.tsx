"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { RootState } from "@/app/redux/store";
import { useCreateShopMutation } from "@/app/redux/features/shop/shopApi";
import GTTextArea from "@/app/components/form/GTTestArea";
import GTInput from "@/app/components/form/GTInput";
import GTForm from "@/app/components/form/GTForm";

const AddShop = () => {
  const router = useRouter();
  const ownerId = useSelector((state: RootState) => state.auth.user?.userId);
  // const dispatch = useDispatch();
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [addShop] = useCreateShopMutation();

  const onSubmit = async (data: any) => {
    try {
      if (ownerId) {
        const formData = new FormData();

        // if (ownerId) {
        const userData = {
          ...data,
          ownerId,
        };

        // }
        console.log("user", userData);
        formData.append("data", JSON.stringify(userData));
        formData.append("logoImage", logoImage as File);

        const res = await addShop(formData).unwrap();

        if (res?.success) {
          toast.success("Shop added successfully!");
          router.push("/dashboard/AddProducts");
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Shop</h1>
        <div className="flex items-center justify-center">
          <div className="md:w-[33%] mx-auto border p-5 bg-white">
            <div>
              <p className="text-center text-[18px] font-bold">Add Shop</p>
            </div>
            <GTForm onSubmit={onSubmit}>
              <div className="py-3">
                <GTInput label="Name" name="name" type="text" />
              </div>
              <div className="py-3">
                <GTInput label="Address" name="address" type="text" />
              </div>
              <div className="py-3">
                <GTTextArea
                  label="Description"
                  name="description"
                  type="Textarea"
                />
              </div>
              <div className="py-3">
                <input
                  name="logo"
                  type="file"
                  onChange={(e) => setLogoImage(e.target.files![0])}
                />
              </div>
              <Button
                className="my-3 w-full rounded-md bg-[#F57224]  font-semibold text-white"
                size="lg"
                type="submit"
              >
                Create Shop
              </Button>
            </GTForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShop;

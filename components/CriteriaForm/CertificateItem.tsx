import { Input } from "@nextui-org/react";
import RemoveButton from "./RemoveButton";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCriteria,
  clearCriteria,
  addItem,
  updateItem,
  removeItem,
} from "@/store/criteriaSlice";
import type { RootState, AppDispatch } from "@/store";

export type CertificateItemProps = {
  certificate: string;
  index: number;
};

export default function CertificateItem({
  certificate,
  index,
}: CertificateItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (value: string) => {
    dispatch(
      updateItem({
        itemType: "certificates",
        index,
        value,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeItem({ itemType: "certificates", index }));
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        label="Certificate Name"
        size="sm"
        value={certificate}
        onChange={(e) => handleChange(e.target.value)}
        type="text"
      />
      <RemoveButton onRemove={handleRemove} />
    </div>
  );
}

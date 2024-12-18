import { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import CriteriaForm from "@/components/CriteriaForm";
import ResultSection from "@/components/ResultSection";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { clearAnalysis } from "@/store/analysisSlice";
import { clearCriteria } from "@/store/criteriaSlice";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { GoArrowLeft } from "react-icons/go";

export default function Result() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const resume = useSelector((state: RootState) => state.resume);

  if (resume.name === "") {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }

  useEffect(() => {
    dispatch(clearCriteria());
    dispatch(clearAnalysis());
    console.log(resume);
  }, [dispatch, resume]);

  return (
    <DefaultLayout>
      <div className="relative w-full max-w-5xl mx-auto">
        <Button
          isIconOnly
          className="absolute top-4 left-4 z-10 hover:text-primary-500"
          variant="flat"
          color="default"
          onPress={() => router.push("/")}
        >
          <GoArrowLeft />
        </Button>
        <CriteriaForm />
        <ResultSection />
      </div>
    </DefaultLayout>
  );
}

import FilePicker from "@/components/FilePicker";
import { extractTextFromPDF } from "@/helpers/pdf";
import DefaultLayout from "@/layouts/default";
import { motion, stagger, useAnimate } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { structuringResume } from "@/helpers/resume";
import { useDispatch } from "react-redux";
import { setResume } from "@/store/resumeSlice";
import type { AppDispatch } from "../store";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useLoading } from "@/hooks/useLoading";
import { Toaster, toast } from "sonner";

export default function IndexPage() {
  const title = [
    "Yeni",
    "Nesil",
    "Özgeçmiş Analizi",
    "ile",
    "İşe",
    "Alım",
    "Sürecinizde",
    "Devrim",
    "Yaratın",
  ];

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const router = useRouter();

  const { activeStep, activeStepMessage, setActiveStep } = useLoading([
    "Özgeçmiş Ayıklanıyor",
    "Özgeçmiş Yapılandırılıyor",
    "Başarılı",
    "Başarısız",
  ]);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeFilePicker = async (files: FileList) => {
    const file = files[0];
    try {
      if (file.type !== "application/pdf") {
        throw new Error("Yalnızca PDF dosyaları kabul edilir.");
      }

      setActiveStep(0);
      const extractedResumeText = await extractTextFromPDF(file);
      console.log(extractedResumeText);

      setActiveStep(1);
      const resume = await structuringResume(extractedResumeText);
      console.log(resume);

      setActiveStep(2);
      dispatch(setResume(resume));

      router.push("/result");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Beklenmeyen bir hata oluştu.");
      setActiveStep(3);
    }
  };

  return (
    <DefaultLayout>
      <div className="relative flex flex-col items-center justify-center  bg-[url('/grid.svg')] min-h-screen p-4">
        <Toaster richColors />
        <div
          className="absolute blur-3xl pointer-events-none"
          aria-hidden="true"
        >
          <div className="custom-clip-polygon aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"></div>
        </div>
        <span className="relative text-center rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-xs text-zinc-50 md:text-sm mb-4">
          <strong>GPT4o</strong> ile güçlendirildi
          <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0"></span>
        </span>
        <h1 className="mb-3 text-center max-w-6xl text-2xl font-bold leading-tight text-zinc-50 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
          <motion.div ref={scope}>
            {title.map((word, index) => {
              const isHighlighted = word === "Özgeçmiş Analizi";
              return (
                <span
                  key={index}
                  className={`opacity-0 ${
                    isHighlighted
                      ? "bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text"
                      : ""
                  }`}
                >
                  {word}{" "}
                </span>
              );
            })}
          </motion.div>
        </h1>
        <p className="mb-9 max-w-2xl text-center text-base text-zinc-400 sm:text-md md:text-xl">
          İşe alımda hızı ve doğruluğu artıran gelişmiş özgeçmiş
          ayrıştırıcımızla işe alımları optimize edin.
        </p>
        <FilePicker onChange={handleChangeFilePicker} />
        {activeStep !== null && activeStep !== 3 && (
          <LoadingOverlay status={activeStepMessage} />
        )}
      </div>
    </DefaultLayout>
  );
}

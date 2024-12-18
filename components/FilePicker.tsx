import React from "react";

type FileUploaderProps = {
  onChange: (files: FileList) => void;
};

const FilePicker: React.FC<FileUploaderProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      onChange(files);
    } else {
      throw new Error("Bir dosya seçmelisiniz.");
    }

    event.target.value = "";
  };

  return (
    <div className="card-wrapper h-[40px] w-[180px] sm:h-[50px] md:h-[70px] sm:w-[200px] md:w-[230px] hover:scale-105 transition-transform ease-in-out duration-300">
      <div className="card-content flex items-center justify-center text-xs">
        <label
          htmlFor="pdf_file"
          className="font-sans cursor-pointer  py-3 px-6 w-full h-full flex items-center justify-center text-gray-300 hover:text-white transition-colors ease-in-out duration-300 font-medium text-[.875rem] sm:text-[1rem] md:text-[1.2rem]"
        >
          Özgeçmiş Yükle
        </label>
        <input
          id="pdf_file"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilePicker;

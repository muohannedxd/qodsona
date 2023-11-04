import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

interface ImageUploadProps {
    formData: Object,
    setFormData: Function
}

const ImageUpload: React.FC<ImageUploadProps> = ({ formData, setFormData }) => {
    const updateImages = (e?: Event) => {
        if (!e?.target) return;

        let files: any = Array.from((e.target as HTMLInputElement).files as FileList);

        files.forEach((file: File) => {
            if (!file) return;

            const newImageUrl = URL.createObjectURL(file);

            if (newImageUrl in formData.imageURLs) return;

            setFormData(
                (prevFormData: any) =>
                ({
                    ...prevFormData,
                    imageURLs: [...prevFormData.imageURLs, newImageUrl]
                })
            )
        })
    }

    useEffect(() => {
        const imageUpload = document.getElementById("files");
        imageUpload?.addEventListener("change", updateImages);

        return () => imageUpload?.removeEventListener("change", updateImages)
    }, [])


    console.log(formData.imageURLs)
    return <>
        <div className="grid grid-cols-4 gap-1">
            {
                (formData.imageURLs.length > 0) &&
                formData.imageURLs
                    .map((imageURL: string, index: number) =>
                        <div key={`img-${index}`} className="overflow-hidden max-h-[20rem] max-w-[20rem] rounded-[8px] object-cover">
                            <img src={imageURL} className="max-h-full" alt="preview" />
                        </div>)
            }
        </div>
        <Label htmlFor="images">Upload some images for better identification</Label>
        <Input id="files" type="file" accept="image/*" multiple className="mb-5"></Input>
    </>
}

export default ImageUpload;
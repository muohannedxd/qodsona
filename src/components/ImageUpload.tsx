import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"


const ImageUpload = () => {
    const [images, setImages] = useState<string[]>([]);

    const updateImages = (e?: Event) => {
        if (!e?.target) return;

        let files: any = Array.from((e.target as HTMLInputElement).files as FileList);

        files.forEach((file: File) => {
            if (!file) return;
            setImages(
                prevImages => [...prevImages, URL.createObjectURL(file)]
            )
        })
    }

    console.log(images)

    useEffect(() => {
        const imageUpload = document.getElementById("files");
        imageUpload?.addEventListener("change", updateImages);

        return () => imageUpload?.removeEventListener("change", updateImages)
    })

    return <>
        <div className="grid grid-cols-4 gap-1">
            {
                (images.length > 0) &&
                images
                    .map(image => <div className="overflow-hidden max-h-[20rem] max-w-[20rem] rounded-[8px] object-cover">
                        <img src={image} className="max-h-full" alt="preview" />
                    </div>)
            }
        </div>
        <Label htmlFor="images">Upload some images for better identification</Label>
        <Input id="files" type="file" multiple className="mb-5"></Input>
    </>
}

export default ImageUpload;
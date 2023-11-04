import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group"

import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import ImageUpload from "@/components/ImageUpload"
import TagsInput from "@/components/TagsInput"

import db, { storage } from "@/config/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { randomUUID } from "crypto"
import { useNavigate } from "react-router-dom"

import { nanoid } from "nanoid"


export default function Post() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    postType: "",
    description: "",
    ageRanges: [],
    genders: [],
    imageURLs: []
  })

  const uploadFile = async (file: any, path: any) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
  }

  const getDownloadURL = async (path: any) => {
    const storageRef = ref(storage, path);
    const url: any = await getDownloadURL(storageRef);
    return url;
  }

  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    if (!event?.target) return;

    const { postType, description, ageRanges, genders } = formData;
    const imageURLs: string[] = []
    const tags: string[] = []

    ageRanges.forEach(ageRange => tags.push(ageRange.value))
    genders.forEach(gender => tags.push(gender.value))

    const images = Array.from((document.getElementById("files") as HTMLInputElement)?.files as FileList);

    images?.forEach(async (image) => {
      const imageName = image.name
      const path = `images/${imageName}}`

      try {
        await uploadFile(image, path)
        const url = await getDownloadURL(path)
        imageURLs.push(url)
      } catch (error) {
        console.error('Error:', error);
      }
    })

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        postType: postType,
        description: description,
        tags: tags,
        imageURLs: imageURLs
      })

      navigate("/")

      console.log(docRef.id)
    } catch (e) {
      alert(e)
    }
  };


  return (
    <Card className="border-0 shadow-lg md:max-w-[60%] mx-auto my-5">
      <CardHeader>
        <CardTitle>Add a post</CardTitle>
        <CardDescription>Add the name of the missing person(s) you're looking for and hopefully someone will reach out to you!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="my-5">
          <RadioGroup name="postType" className="flex gap-10 mb-5"
            onChange={(event) => setFormData(prevFormData => ({
              ...prevFormData,
              postType: (event.target as HTMLFormElement).value
            }))}>
            <div className="flex gap-3">
              <RadioGroupItem id="missing" value="missing" />
              <Label htmlFor="missing">Ask for help finding a missing person</Label>
            </div>

            <div className="flex gap-3">
              <RadioGroupItem id="reporting" value="reporting" />
              <Label htmlFor="reporting">Report someone who is missing</Label>
            </div>

          </RadioGroup>

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder={`Please provide any additional details that might be useful in locating the missing person.\nThis can include physical characteristics, clothing, or any information you believe is important`}
            className="resize-none mb-5"
            onChange={(event) => setFormData(prevFormData => ({
              ...prevFormData,
              description: (event.target as HTMLTextAreaElement).value
            }))}
          />

          <TagsInput formData={formData} setFormData={setFormData} />
          <ImageUpload formData={formData} setFormData={setFormData} />

          <Button className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card >
  )
}



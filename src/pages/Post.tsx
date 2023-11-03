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

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import ImageUpload from "@/components/ImageUpload"



export default function Post() {
  return (
    <Card className="border-0 shadow-lg md:max-w-[60%] mx-auto my-5">
      <CardHeader>
        <CardTitle>Add a post</CardTitle>
        <CardDescription>Add the name of the missing person you're looking for and hopefully someone will reach out to you!</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="my-5">
          <RadioGroup className="flex gap-10 mb-5">
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
            placeholder={`Please provide any additional details that might be useful in locating the missing person.\nThis can include physical characteristics, clothing, or any information you believe is important`}
            className="resize-none mb-5"
          />
          {/* <Label htmlFor="images">Upload some images for better identification</Label>
          <Input type="file" multiple className="mb-5"></Input> */}

          <ImageUpload />

          <Button className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}



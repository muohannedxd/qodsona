

export default function Post() {
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
              <RadioGroupItem id="missing" value="missing" className="text-black" />
              <Label htmlFor="missing">Ask for help finding a missing person</Label>
            </div>

            <div className="flex gap-3">
              <RadioGroupItem id="reporting" value="reporting" className="text-black" />
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

          <Button className="w-full bg-slate-900">Submit</Button>
        </form>
      </CardContent>
    </Card >
  )
}



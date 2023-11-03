import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import Select from "react-select"

interface TagsInputProps {
    tags: string[]
}

const TagsInput: React.FC<TagsInputProps> = ({ tags }) => {
    const ageRanges = ["Any", "Toddler", "Child", "Adolescent", "Young Adult", "Adult", "Elderly"]
    const genders = ["Male", "Female"]

    const ageOptions: Record<any, any>[] = []
    const genderOptions: Record<any, any>[] = []

    ageRanges.forEach(ageRange => {
        ageOptions.push({
            value: ageRange.toLowerCase(),
            label: ageRange
        })
    })

    genders.forEach(gender =>
        genderOptions.push({
            value: gender.toLowerCase(),
            label: gender
        })
    )

    console.log(ageOptions)

    return <div>
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add tags</CardTitle>
                <CardDescription>Tags make it simple for users to find your post through searches</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="age-ranges">Select age category</Label>
                        <Select id="age-ranges" options={ageOptions} isMulti/>
                    </div>
                    <div>
                        <Label htmlFor="gender">Select gender</Label>
                        <Select id="gender" options={genderOptions} isMulti/>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div >
}


export default TagsInput;
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
    formData: Object
    setFormData: Function
}

const TagsInput: React.FC<TagsInputProps> = ({ formData, setFormData }) => {
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

    const handleAgeRangesChange = (selected: any[]) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            ageRanges: selected,
        }))
    }

    const handleGendersChange = (selected: any[]) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            genders: selected
        }))
    }


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
                        <Select id="age-ranges" name="ageRanges" options={ageOptions} isMulti
                            value={formData.ageRanges}
                            onChange={handleAgeRangesChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="gender">Select gender</Label>
                        <Select id="gender" name="genders" options={genderOptions} isMulti
                            value={formData.genders}
                            onChange={handleGendersChange}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div >
}


export default TagsInput;
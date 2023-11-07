import {Input} from "antd";


interface ICustomInput {
    title: string,
    value?: string | number | any,
    valueChanged?: any,
}

export const CustomInput = ({ title, value, valueChanged }: ICustomInput) => (
    <div className="flex items-center justify-between gap-4">
        <label>{title}</label>
        <Input placeholder="Type here!" value={value} onChange={(e) => valueChanged(e.target.value)} className="w-48" />
    </div>
)
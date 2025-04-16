import React from "react";

interface FormularSectionProps {
    title: string;
    children: React.ReactNode;
}

export const FormularSection:React.FC<FormularSectionProps> = ({title, children}) => {
    return(
        <div className="flex flex-col gap-2">
            <label>{title}</label>
            {children}
        </div>
    )
}
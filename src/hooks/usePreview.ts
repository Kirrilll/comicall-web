import React, { useEffect, useState } from "react";

export const usePreview = (file: File | null) => {

    const [preview, setPreview] = useState<ArrayBuffer | null | string>(null);

    useEffect(() => {
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file!);
            reader.onloadend = () => setPreview(reader.result)
        }   
        else{
            setPreview(null);
        }
    }, [file])

    return preview;
}
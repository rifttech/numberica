import React from "react"

export default function DataInput({ text, onChange }) {
    return (
        <textarea
            style={{ width: "200px", height: "300px", fontSize: "20px" }}
            value={text}
            onChange={(e) => onChange(e)} />
    )
}

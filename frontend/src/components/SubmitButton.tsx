import { useFormStatus } from "react-dom"

export default function SubmitButton() {
    const {pending} = useFormStatus()
  return (
    <button disabled={pending} className="px-2 py-1 bg-teal-600 text-white rounded-md w-full mt-4" >
      {
        pending ? "Saving..." : "Save"
      }
    </button >
  )
}


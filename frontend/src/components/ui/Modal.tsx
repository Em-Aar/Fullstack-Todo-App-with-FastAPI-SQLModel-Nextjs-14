import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddTask from "../AddTask"
import EditTask from "../EditTask"
import { Todo } from "../../../types"


export function Modal({children, title, Adding, Editing, task}:{children:React.ReactNode, title:string, Adding?:boolean, Editing?:boolean, task:Todo}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {Adding && <AddTask/>}
        {Editing && <EditTask task = {task} />}
      </DialogContent>
    </Dialog>
  )
}

"use client";
import { CiSquareCheck } from "react-icons/ci";
import { Todo } from "../../types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ToolTip from "./ToolTip";
import { Modal } from "./ui/Modal";
import { delete_todo, status_change } from "@/actions/actions";
import toast from "react-hot-toast";

export default function Task({ task }: { task: Todo }) {

  const handleStatus = async () => {
    const response = await status_change(
      task.id,
      task.content,
      task.is_completed
    );

    if (response.status == "success") {
      toast.success(response.message);
    } else if (response.status == "error") {
      toast.error(response.message);
    }
  };

  const handleDelete = async () => {
    const response = await delete_todo(task.id)
    if(response.status == "error"){
      toast.error(response.message)
    } else {
      toast.success(response.message)
    }
  }


  return (
    <tr className="flex justify-between items-center border-b border-gray-300 px-2 py-2">
      <td>{task.content}</td>
      <td className="flex gap-x-2">
        <ToolTip tool_tip_content="Mark as completed">
          <button onClick={handleStatus}>
            <CiSquareCheck
              size={28}
              className={`${
                task.is_completed ? "text-green-500" : "text-gray-300"
              }`}
            />
          </button>
        </ToolTip>

        <Modal title="Edit Task" Editing={true} task={task}>
          <FiEdit size={24} className="text-blue-500" />
        </Modal>

        <button onClick={handleDelete}>
        <FiTrash2 size={24} className="text-red-600" />
        </button>      
        
      </td>
    </tr>
  );
}

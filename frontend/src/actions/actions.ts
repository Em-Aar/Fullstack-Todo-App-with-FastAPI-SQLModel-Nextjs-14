"use server";

import { revalidatePath } from "next/cache";

// add_todo

export async function add_todo(
  state: { status: string; message: string },
  formData: FormData
) {
  const new_todo = formData.get("add_task") as string;

  //TODO add validation through Zod or Yup

  try {
    const response = await fetch("http://localhost:8000/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: new_todo }),
    });
    revalidatePath("/todos");
    const data = await response.json();
    if (data.content) {
      revalidatePath("/todos/");
      return { status: "success", message: "Todo added successfully" };
    } else {
      return { status: "error", message: "Something went wrong" };
    }
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
}

// Edit todo

export async function edit_todo(
  state: { status: string; message: string },
  {
    id,
    content,
    is_completed,
  }: { id: number; content: string; is_completed: boolean }
) {
  // console.log({id,content,is_completed})

  //TODO add validation through Zod or Yup

  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, is_completed }),
    });
    const res = await response.json();
    if (res.content) {
      revalidatePath("/todos/");
      return { status: "success", message: "Todo edited successfully" };
    } else {
      return { status: "error", message: "Not Found" };
    }
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
}

// Status Change

export async function status_change(
  id: number,
  content: string,
  is_completed: boolean
) {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        is_completed: !is_completed,
      }),
    });
    const res = await response.json();
    if (res.content) {
      revalidatePath("/todos/");
      return { status: "success", message: "Status changed successfully" };
    } else {
      return { status: "error", message: "Not Found" };
    }
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
}

// Delete todo

export async function delete_todo(id: number) {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if(res.message){
        revalidatePath("/todos/");
        return { status: "success", message: res.message };
    } else {
        return { status: "error", message: "Something went wrong" };
    }
   
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
}

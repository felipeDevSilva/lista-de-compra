import { useEffect, useState } from "react"
import "./App.scss"
import { Task } from "./components/Task"

import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "./services/firebase"

interface ListItem {
  id: string
  name: string
  isDone: boolean
}

function App() {
  const [list, setList] = useState<ListItem[]>([])
  const [task, setTask] = useState("")

  async function handleAddTask() {
    const isTaskExist = list.find((item) => item.name === task)
    if (task === "") {
      return alert("Por favor, preencha o nome do item")
    }

    if (isTaskExist) {
      return alert("Este item já está na sua lista de compras !!")
    }

    const taskRef = collection(db, "task")
    const taskAdd = await addDoc(taskRef, {
      name: task,
      isDone: false,
    })

    setTask("")
    searchDB()
  }

  async function handleTaskCompleted(id: string, isDone: Boolean) {
    const taskRef = await doc(db, "task", id)

    const taskCompleted = list.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    )

    await updateDoc(taskRef, {
      isDone: !isDone,
    })

    setList(taskCompleted)
    searchDB()
  }

  async function handleDeleteTask(id: string) {
    const taskDeleted = list.filter((task) => task.id !== id)
    if (!taskDeleted) {
      return
    }
    const taskDoc = doc(db, "task", id)

    await deleteDoc(taskDoc)
    console.log(taskDoc)
    searchDB()
  }

  async function searchDB() {
    const taskRef = collection(db, "task")

    const getTasks = async () => {
      const data = await getDocs(taskRef)
      setList(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })))
    }
    getTasks()
  }

  useEffect(() => {
    searchDB()
  }, [])

  return (
    <div className="container">
      <h1>Lista de Compras</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Digite o próximo item"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Criar</button>
      </div>

      <div className="tasks">
        {list.map((task) => (
          <Task
            key={task.id}
            taskInfo={task}
            taskCompleted={handleTaskCompleted}
            taskDeleted={handleDeleteTask}
          />
        ))}
        {list.length === 0 && <div>Nenhum Item</div>}
      </div>
    </div>
  )
}

export default App

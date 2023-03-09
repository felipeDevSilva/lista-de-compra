import { CheckCircle, Trash } from "phosphor-react"

import "./Task.scss"

interface TaskProps {
  taskInfo: {
    id: string
    name: string
    isDone: boolean
  }
  taskCompleted: (id: string, isDone: boolean) => void
  taskDeleted: (id: string) => void
}

export function Task({ taskInfo, taskCompleted, taskDeleted }: TaskProps) {
  return (
    <div className={`task ${taskInfo.isDone && "delete"}`}>
      <h2>{taskInfo.name}</h2>
      <div className="act">
        <button onClick={() => taskCompleted(taskInfo.id, taskInfo.isDone)}>
          <CheckCircle size={22} className="done" />
        </button>
        <button onClick={() => taskDeleted(taskInfo.id)}>
          <Trash size={22} className="delete" />
        </button>
      </div>
    </div>
  )
}

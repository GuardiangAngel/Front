import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GanttChartComponent from './GanttChartComponent';

function ProjectCard({ project, onUpdate, onDelete }) {
    const [showStages, setShowStages] = useState(false);

    const handleToggleStages = () => {
        setShowStages(!showStages);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(project.stages.map((stage) => stage.tasks));
        const [reorderedItem] = items[result.source.index].splice(
        result.source.index,
        1
        );
        items[result.destination.index].splice(
        result.destination.index,
        0,
        reorderedItem
        );

        const updatedStages = project.stages.map((stage, index) => ({
        ...stage,
        tasks: items[index],
        }));

        onUpdate(project.id, { stages: updatedStages });
    };

    const handleUpdateStage = async (projectId, stageId) => {
        try {
          // Логика для отображения формы редактирования этапа
          // После отправки формы, отправьте запрос на сервер для обновления этапа
          // ...
    
          // Обновите projects с помощью onUpdate
            onUpdate(projectId, {
                stages: project.stages.map((stage) => {
                if (stage.id === stageId) {
                    // ... обновите данные этапа ...
                }
                return stage;
                }),
            });
        } catch (err) {
          // ... (обработка ошибки) ...
        }
    };
    
    const handleDeleteStage = async (projectId, stageId) => {
        try {
            // Подтверждение удаления этапа
            // После подтверждения, отправьте запрос на сервер для удаления этапа
            // ...
        
            // Обновите projects с помощью onUpdate
            onUpdate(projectId, {
                stages: project.stages.filter((stage) => stage.id !== stageId),
            });
        } catch (err) {
          // ... (обработка ошибки) ...
        }
    };
    
    const handleAddStage = async (projectId) => {
        try {
            // Логика для отображения формы добавления этапа
            // После отправки формы, отправьте запрос на сервер для добавления этапа
            // ...
        
            // Получите данные нового этапа с сервера
            // ...
        
            // Обновите projects с помощью onUpdate
            onUpdate(projectId, {
                stages: [...project.stages, /* новый этап */],
            });
        } catch (err) {
          // ... (обработка ошибки) ...
        }
    };
    
    const handleUpdateTask = async (projectId, stageId, taskId) => {
        try {
          // Логика для отображения формы редактирования задачи
          // После отправки формы, отправьте запрос на сервер для обновления задачи
          // ...
    
          // Обновите projects с помощью onUpdate
            onUpdate(projectId, {
                stages: project.stages.map((stage) => {
                if (stage.id === stageId) {
                    return {
                    ...stage,
                    tasks: stage.tasks.map((task) => {
                        if (task.id === taskId) {
                        // ... обновите данные задачи ...
                        }
                        return task;
                    }),
                    };
                }
                return stage;
                }),
            });
        } catch (err) {
          // ... (обработка ошибки) ...
        }
    };
    
    const handleDeleteTask = async (projectId, stageId, taskId) => {
        try {
            // Подтверждение удаления задачи
            // После подтверждения, отправьте запрос на сервер для удаления задачи
            // ...
        
            // Обновите projects с помощью onUpdate
            onUpdate(projectId, {
                stages: project.stages.map((stage) => {
                if (stage.id === stageId) {
                    return {
                    ...stage,
                    tasks: stage.tasks.filter((task) => task.id !== taskId),
                    };
                }
                return stage;
                }),
            });
        } catch (err) {
          // ... (обработка ошибки) ...
        }
    };
    
    const handleAddTask = async (projectId, stageId) => {
        try {
          // Логика для отображения формы добавления задачи
          // После отправки формы, отправьте запрос на сервер для добавления задачи
          // ...
    
          // Получите данные новой задачи с сервера
          // ...
    
          // Обновите projects с помощью onUpdate
            onUpdate(projectId, {
                stages: project.stages.map((stage) => {
                if (stage.id === stageId) {
                    return { ...stage, tasks: [...stage.tasks, /* новая задача */] };
                }
                return stage;
                }),
            });
        } catch (err) {
          // ... (обработка ошибки) ...
        }
    };

    return (
        <div className="project-card">
        <h3>{project.name}</h3>
        <p>Описание: {project.description}</p>
        <button onClick={handleToggleStages}>
            {showStages ? 'Скрыть этапы' : 'Показать этапы'}
        </button>
        {showStages && (
            <>
            <GanttChartComponent project={project} onUpdate={onUpdate} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
            {project.stages.map((stage, stageIndex) => (
                <div key={stage.id} className="stage">
                <h4>{stage.name}</h4>
                <button
                    onClick={() => handleUpdateStage(project.id, stage.id)}
                >
                    Редактировать
                </button>
                <button
                    onClick={() => handleDeleteStage(project.id, stage.id)}
                >
                    Удалить
                </button>
                <Droppable droppableId={stage.id.toString()}>
                    {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {stage.tasks.map((task, taskIndex) => (
                        <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
                            index={taskIndex}
                        >
                            {(provided) => (
                            <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                {task.name}
                                <button
                                onClick={() =>
                                    handleUpdateTask(
                                    project.id,
                                    stage.id,
                                    task.id
                                    )
                                }
                                >
                                Редактировать
                                </button>
                                <button
                                onClick={() =>
                                    handleDeleteTask(
                                    project.id,
                                    stage.id,
                                    task.id
                                    )
                                }
                                >
                                Удалить
                                </button>
                            </li>
                            )}
                        </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
                <button
                    onClick={() => handleAddTask(project.id, stage.id)}
                >
                    Добавить задачу
                </button>
                </div>
            ))}
            <button onClick={() => handleAddStage(project.id)}>
                Добавить этап
            </button>
            </DragDropContext>
            </>
        )}
        <div className="buttons">
            <button onClick={() => onUpdate(project.id)}>Редактировать</button>
            <button onClick={() => onDelete(project.id)}>Удалить</button>
        </div>
        </div>
    );
}

export default ProjectCard;
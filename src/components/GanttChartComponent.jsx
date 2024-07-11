import React, { useState, useEffect } from 'react';
import ReactGantt, { GanttRow  } from 'react-gantt';

const tasks = [
    {
        id: 1,
        name: 'Задача 1',
        start: new Date(2023, 10, 10),
        end: new Date(2023, 10, 20),
        progress: 50,
        stage: 'Планирование',
    },
    {
        id: 2,
        name: 'Задача 2',
        start: new Date(2023, 10, 20),
        end: new Date(2023, 10, 30),
        progress: 100,
        stage: 'Разработка',
        },
        {
        id: 3,
        name: 'Задача 3',
        start: new Date(2023, 10, 30),
        end: new Date(2023, 11, 10),
        progress: 0,
        stage: 'Тестирование',
        },
];
    
const stages = ['Планирование', 'Разработка', 'Тестирование', 'Релиз'];

function GanttChartComponent({ project, onUpdate }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const formattedData = project.stages.map((stage) => ({
            id: stage.id,
            name: stage.name,
            tasks: stage.tasks.map((task) => ({
            id: task.id,
            name: task.name,
            start: new Date(task.start),
            end: new Date(task.end),
            progress: task.progress,
            })),
        }));
        setChartData(formattedData);
    }, [project]);

    const handleTaskChange = (taskId, updatedTask) => {
        onUpdate(project.id, {
            stages: project.stages.map((stage) => {
            if (stage.tasks.some((task) => task.id === taskId)) {
                return {
                ...stage,
                tasks: stage.tasks.map((task) =>
                    task.id === taskId ? updatedTask : task
                ),
                };
            }
            return stage;
            }),
        });
    };

    return (
        <ReactGantt
            data={chartData}
            stages={stages}
            onTaskChange={handleTaskChange}
            taskRenderer={({ task }) => (
            <GanttRow 
                key={task.id}
                {...task}
                onClick={() => {
                // Обработка клика на задаче - вызов модального окна или другой логики
                console.log('Задача:', task.name);
                }}
            />
            )}
        />
    );
}

export default GanttChartComponent;
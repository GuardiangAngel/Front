import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
            throw new Error('Ошибка при загрузке проектов');
            }
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
        };

        fetchProjects();
    }, []);

    const handleAddProject = () => {
        // Логика для отображения формы добавления проекта
        // После отправки формы, обновите projects с помощью setProjects
    };

    const handleUpdateProject = async (projectId, updatedData) => {
        try {
        // Логика для отображения формы редактирования проекта
        // После отправки формы, отправьте запрос на сервер для обновления проекта
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
            // Вставьте обновленные данные проекта в тело запроса
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении проекта');
        }

        // Обновите projects с помощью setProjects
        const updatedProjects = projects.map((project) => {
            if (project.id === projectId) {
            return { ...project, // ... обновите данные проекта
            };
            }
            return project;
        });
        setProjects(
            projects.map((project) =>
                project.id === projectId ? { ...project, ...updatedData } : project
            )
        );
        } catch (err) {
        setError(err.message);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
        // Подтверждение удаления проекта
        // После подтверждения, отправьте запрос на сервер для удаления проекта
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении проекта');
        }

        // Обновите projects с помощью setProjects
        setProjects(projects.filter((project) => project.id !== projectId));
        } catch (err) {
        setError(err.message);
        }
    };

    const handleUpdateStage = async (projectId, stageId) => {
        try {
            // Логика для отображения формы редактирования этапа
            // После отправки формы, отправьте запрос на сервер для обновления этапа
            const response = await fetch(`/api/projects/${projectId}/stages/${stageId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                // Вставьте обновленные данные этапа в тело запроса
            });
        
            if (!response.ok) {
                throw new Error('Ошибка при обновлении этапа');
            }
        
            // Обновите projects с помощью setProjects
            const updatedProjects = projects.map((project) => {
                if (project.id === projectId) {
                const updatedStages = project.stages.map((stage) => {
                    if (stage.id === stageId) {
                    return { ...stage, // ... обновите данные этапа
                    };
                    }
                    return stage;
                });
                return { ...project, stages: updatedStages };
                }
                return project;
            });
            setProjects(updatedProjects);
            } catch (err) {
            setError(err.message);
            }
        };
        
        const handleDeleteStage = async (projectId, stageId) => {
            try {
            // Подтверждение удаления этапа
            // После подтверждения, отправьте запрос на сервер для удаления этапа
            const response = await fetch(`/api/projects/${projectId}/stages/${stageId}`, {
                method: 'DELETE',
            });
        
            if (!response.ok) {
                throw new Error('Ошибка при удалении этапа');
            }
        
            // Обновите projects с помощью setProjects
            const updatedProjects = projects.map((project) => {
                if (project.id === projectId) {
                return {
                    ...project,
                    stages: project.stages.filter((stage) => stage.id !== stageId),
                };
                }
                return project;
            });
            setProjects(updatedProjects);
            } catch (err) {
            setError(err.message);
            }
        };
        
        const handleAddStage = async (projectId) => {
            try {
            // Логика для отображения формы добавления этапа
            // После отправки формы, отправьте запрос на сервер для добавления этапа
            const response = await fetch(`/api/projects/${projectId}/stages`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                // Вставьте данные нового этапа в тело запроса
            });
        
            if (!response.ok) {
                throw new Error('Ошибка при добавлении этапа');
            }
        
            const newStage = await response.json(); // Получите данные нового этапа
            // Обновите projects с помощью setProjects
            const updatedProjects = projects.map((project) => {
                if (project.id === projectId) {
                return { ...project, stages: [...project.stages, newStage] };
                }
                return project;
            });
            setProjects(updatedProjects);
            } catch (err) {
            setError(err.message);
            }
        };
        const handleUpdateTask = async (projectId, stageId, taskId) => {
            // ... (логика обновления задачи) ...
        };
            
        const handleDeleteTask = async (projectId, stageId, taskId) => {
            // ... (логика удаления задачи) ...
        };
            
        const handleAddTask = async (projectId, stageId) => {
                // ... (логика добавления задачи) ...
        };
    if (isLoading) {
        return <div>Загрузка проектов...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
        <h1>Панель управления проектами</h1>
        <button onClick={handleAddProject}>Добавить проект</button>
        <div className="project-list">
            {projects.map((project) => (
            <ProjectCard
                key={project.id}
                project={project}
                onUpdate={handleUpdateProject}
                onDelete={handleDeleteProject}
            />
            ))}
        </div>
        </div>
    );
    
}

export default Dashboard;
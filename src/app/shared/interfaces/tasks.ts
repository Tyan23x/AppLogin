export interface Itasks {
    taskId?: string;  // Agrega esta línea para incluir el ID de la tarea
    userId:string;
    title: string;
    description: string;
    date: any;
    done: boolean;
}
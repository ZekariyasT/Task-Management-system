<?php

namespace App\Http\Controllers\Api;
use App\Http\Resources\TaskResource;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return TaskResource::collection($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
            'priority' => 'required|integer|min:1|max:5',
        ]);

        $task = $request->user()->tasks()->create($request->all());
        return new TaskResource($task);
    }

    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
            'priority' => 'sometimes|required|integer|min:1|max:5',
        ]);

        $task->update($validated);

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
<template>
    <div class="task-card">
        <div class="task-container">
            <h3>
                {{ task.name }}
            </h3>
            <small>{{ new Date(task.dueDate).toLocaleDateString("en-US") }}</small>
        </div>
    </div>
</template>

<script>
export default {
  name: 'card',
  props: [
      'task'
  ]
}
</script>

<style>
.task-card {
  background-color: white;
  margin: 2%;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  text-align:left
}

.task-card h3 {
    font-size: 18px
}

.task-card:hover {
  background-color: #f3f3f3;
}

.task-card .task-container {
  padding: 0.1% 2% 0.1% 2%;
}

.task-card .task-container p {
  font-size: 0.9em;
  letter-spacing: 0.05em;
  -webkit-margin-before: 0.2em;
  -webkit-margin-after: 0.2em;
}

.task-card .task-container .task-label {
  width: 50px;
  height: 10px;
  border-radius: 3px;
  margin-top: 8px;
  display: inline-block;
  margin-right: 2%;
}

.task-card .task-container .task-notifications {
  margin-bottom: 5px;
}

.task-card .task-container .task-notifications i {
  display: inline-block;
  font-size: 0.8em;
}

.task-card .task-container .task-notifications i.fa-list {
  margin-right: 7px;
}

.task-card .task-container .task-notifications .comments-number {
  display: inline-block;
  font-size: 0.8em;
}
</style>

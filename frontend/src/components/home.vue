<template>
  <div class="overlay">
    <div class="full"></div>
    <div class="floattext">
      <h1 class="title">A Simple, Unique Planner</h1>
      <h1 class="subtitle">This planner application was made by a college student for college students with input from college students!</h1>
      <h1 class="subtitle">There's a million planners out there, how is Somehow I Manage different?</h1>
      <h1 class="subtitle">Other planners allow you to keep track of when assignemnts are due... but what about when you'll actually do them?
        You know you have a paper due on friday - but will you do it on Monday or maybe Wednesday? How do you keep track of that? With Somehow
        I Manage you can keep up with "Due Dates" and "To Do Dates" all with a simple interface!
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Delius&display=swap');
@import url('https://fonts.googleapis.com/css?family=Sofia&display=swap');

.full {
  background-image: url('~@/assets/danbackground.jpg');
  height: 100%;
  width: 100%;
  z-index: -1;
  background-size: cover;
  background-position: 50%;
  position: absolute;
  transform: translate3d(0px, 0px, 0px);
}

.overlay  {
  background: linear-gradient(0deg,rgba(44,44,44,.2), rgba(91, 169, 235, 0.9), rgb(91, 169, 235));
  height: 100vh;
  z-index: 1;
}

.floattext {
  position: absolute;
  top: 45%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 76%;
}

.title {
  color: white;
  font-size: 5rem;
  font-family: 'Sofia', cursive;
  font-weight: 400;
  margin-bottom: 2rem;
}

.subtitle {
  color:white;
  font-size: 1.5rem;
  font-family: 'Delius', cursive;
}
</style>

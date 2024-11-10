<template>
  <div
    class="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-40"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
  ></div>

  <div class="fixed inset-0 z-40">
    <div class="flex h-screen justify-items-center items-center justify-center">
      <div class="w-10/12 max-w-[500px] md:w-[500px] rounded-lg">
        <div class="flex justify-center">
          <div class="loader">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  @apply border-r-cyan-600;
  animation: l15 1s infinite linear;
}
.loader::before,
.loader::after {    
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15{ 
  100%{transform: rotate(1turn)}
}
</style>
<template>
  <!-- component -->
  <div class="bg-white md:flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-full md:w-1/2 px-6 lg:px-24">
      <RouterView />
    </div>
    <div
      class="w-full md:w-1/2 h-[95%] md:block lg:m-6 md:rounded-xl p-24 relative overflow-hidden z-10 bg-[url('/src/assets/images/hero.png')] bg-cover bg-no-repeat bg-center before:content-[''] before:absolute before:inset-0 before:block before:bg-cyan-600 before:opacity-50 before:z-[-5]"
    ></div>
  </div>
</template>

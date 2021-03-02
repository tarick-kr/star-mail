<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-0 pt-1 pb-2">
        Каким должно быть изображение и как его подготовить?
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>
          Изображение должно быть ближе к квадратному и в формате jpeg/jpg. Также поддерживается формат png
          однако его лучше не использовать из-за большего размера файла.
          Перед загрузкой файл следует оптимизировать для вэба (уменьшить его размер без потери качества),
          например воспользовавшись <a href="https://tinypng.com/">этим</a> сайтом.
        </p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'AppHelpImage'
}
</script>

<style scoped>

</style>

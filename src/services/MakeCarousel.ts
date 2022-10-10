export default function makeCarousel<ArrayType>(array: ArrayType[], size: number): ArrayType[][] {
  // size - number of banners in el-carousel-item
  const subarray = [];
  if (array) {
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      subarray[i] = array.slice(i * size, i * size + size);
    }
  }
  return subarray;
}

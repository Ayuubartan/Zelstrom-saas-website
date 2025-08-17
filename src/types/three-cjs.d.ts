// Map CJS and generic 'three' to the typed ESM surface
declare module 'three/src/Three' {
  export * from 'three';
}

declare module 'three/build/three.cjs' {
  export * from 'three';
  export as namespace THREE;
}

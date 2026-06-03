function ProductCardSkeleton() {
  return (
    <div className="bg-white p-4 shadow-md animate-pulse">
      <div className="mb-5 h-4 w-3/4 rounded bg-gray-200"></div>

      <div className="mb-5 flex h-32 items-center justify-center">
        <div className="h-28 w-28 rounded-full bg-gray-200"></div>
      </div>

      <div className="mb-3 h-3 w-1/2 rounded bg-gray-200"></div>

      <div className="h-5 w-2/3 rounded bg-gray-200"></div>
    </div>
  )
}

export default ProductCardSkeleton
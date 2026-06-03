import { Link } from 'react-router-dom'

type ProductCardProps = {
  id: number
  title: string
  brand?: string
  price: number
  thumbnail: string
  linkPrefix?: string
}

function ProductCard({
  id,
  title,
  brand,
  price,
  thumbnail,
  linkPrefix = '/produtos',
}: ProductCardProps) {
  return (
    <Link
      to={`${linkPrefix}/${id}`}
      className="bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
    >
      <h3 className="mb-5 text-sm font-bold text-gray-700">
        {title}
      </h3>

      <div className="mb-5 flex h-32 items-center justify-center">
        <img
          src={thumbnail}
          alt={title}
          className="h-28 w-28 object-contain"
        />
      </div>

      <p className="text-sm text-gray-500">
        {brand || 'Marca não informada'}
      </p>

      <p className="text-xl font-semibold text-gray-600">
        R$ {price}
      </p>
    </Link>
  )
}

export default ProductCard
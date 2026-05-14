import { getProducts, addProduct, deleteProduct, Product } from './actions'

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Supabase + Vercel — Leenar PoC
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white">Ürünler</h1>
        <p className="text-slate-400 text-sm mt-1">
          {products.length} ürün · Supabase PostgreSQL
        </p>
      </div>

      {/* Add Form */}
      <form
        action={addProduct}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col gap-4"
      >
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
          Yeni Ürün Ekle
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400">Ürün Adı</label>
            <input
              name="name"
              required
              placeholder="ör: Laptop Stand"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400">Fiyat (₺)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="ör: 299.99"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400">Açıklama (opsiyonel)</label>
          <input
            name="description"
            placeholder="Kısa bir açıklama..."
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="self-end px-6 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Ekle →
        </button>
      </form>

      {/* Products List */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-slate-600 text-sm">
          Henüz ürün yok. Yukarıdan ekleyebilirsin.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl px-6 py-4 flex items-center justify-between transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-medium">{product.name}</span>
                {product.description && (
                  <span className="text-slate-500 text-sm">{product.description}</span>
                )}
                <span className="text-slate-600 text-xs mt-1">{formatDate(product.created_at)}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-mono font-semibold">
                  {formatPrice(product.price)}
                </span>
                <form action={deleteProduct.bind(null, product.id)}>
                  <button
                    type="submit"
                    className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 text-xs transition-all"
                  >
                    Sil
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

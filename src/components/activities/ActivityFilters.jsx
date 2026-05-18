export default function ActivityFilters({

  search,
  setSearch,

  priorityFilter,
  setPriorityFilter,

  statusFilter,
  setStatusFilter

}) {

  return (

    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
      mb-6
    ">

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      ">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari kegiatan..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

        {/* PRIORITY */}
        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
          className="
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            bg-white
          "
        >

          <option value="all">
            Semua Prioritas
          </option>

          <option value="Tinggi">
            Tinggi
          </option>

          <option value="Sedang">
            Sedang
          </option>

          <option value="Rendah">
            Rendah
          </option>

        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            bg-white
          "
        >

          <option value="all">
            Semua Status
          </option>

          <option value="Belum">
            Belum
          </option>

          <option value="Selesai">
            Selesai
          </option>

        </select>

      </div>

    </div>
  )
}
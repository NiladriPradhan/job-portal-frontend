import JobCard from '@/components/JobCard'

const arr = [2, 8, 6, 4, 2, 1, 3, 6, 5, 4, 8, 3, 2, 1]
const _arr = [1, 2, 3, 4, 5]

const ago = arr.map((elem) => {
  return `${elem} day${elem > 1 ? 's' : ''} ago`
})

export default function Browse() {
  return (
    <div className="mx-auto my-10 max-w-7xl">
      <h1>Search result - ({arr.length}) </h1>
      <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {_arr.map((elem, idx) => (
          <JobCard idx={idx} ago={ago[idx]} />
        ))}
      </div>
    </div>
  )
}

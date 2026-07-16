import React from 'react'
import Filter from './Filter'
import BooksList from './BooksList'
import Stats from './Stats'

const BooksSection = () => {
  return (
    <section>
      <Filter />
      <BooksList />
      <Stats />
    </section>
  )
}

export default BooksSection

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from "../src/app/page"
 
describe('Page', () => {
  it('renders categories', () => {
    render(<Page />)
 
    const heading = screen.getByRole('categories')
 
    expect(heading).toBeInTheDocument()
  })
})

describe('Page', () => {
    it('renders restaruant list', () => {
      render(<Page />)
   
      const heading = screen.getByRole('restaurant-list')
   
      expect(heading).toBeInTheDocument()
    })
  })
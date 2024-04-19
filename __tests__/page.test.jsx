import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from "../src/app/page"
 
describe('Page', () => {
  it('renders categories', () => {
    render(<Page />)
 
    const categories = screen.getByRole('categories')
 
    expect(categories).toBeInTheDocument()
  })
})

describe('Page', () => {
    it('renders restaruant list', () => {
      
      render(<Page />)
   
      const heading = screen.getByRole('restaurant-list')
   
      expect(heading).toBeInTheDocument()
    })
  })

describe('Page', () => {
    it('renders restaruant list', () => {
      render(<Page />)
   
      const restaruant_keywords = screen.getByText("Burgers")
   
      expect(restaruant_keywords).toBeInTheDocument()
    })
  })

describe('Page', () => {
    it('renders filter buttons', () => {
      render(<Page />)
   
      const filter_buttons = screen.getByText("Time Filter")
   
      expect(filter_buttons).toBeInTheDocument()
    })
  })


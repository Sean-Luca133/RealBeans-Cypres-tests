describe('Tests for Real Beans', () => {
  beforeEach(() => {
    cy.visit('https://r1043155-realbeans.myshopify.com/')
    cy.get('input').eq(1).type('theupu')
    cy.get('button').click()
  })

context("Catelog shows correct items ",() => {

  it('Check text of items', () => {
  cy.get('[id="HeaderMenu-catalog"]').click()
  cy.get('[id="product-grid"]').get('h3').contains('Blended coffee 5kg')
  cy.get('[id="product-grid"]').get('h3').contains('Roasted coffee beans 5kg')
  cy.get('[id="product-grid"]').get('span').contains('From $55.00 USD')
  cy.get('[id="product-grid"]').get('span').contains('From $40.00 USD')
  }
  
)


  it('Check images of items', () => {
  cy.get('[id="HeaderMenu-catalog"]').click()

  cy.get('[id="product-grid"]')
    .get('img').eq(0).should('have.attr', 'srcset')
    .then((srcset) => {
    expect(srcset).to.contains('RealBeansBlendBag.png')
  })

    cy.get('[data-id="template--23702549495844__product-grid"]')
    .get('img').eq(1).should('have.attr', 'srcset')
    .then((srcset) => {
    expect(srcset).to.contains('RealBeansRoastedBag.png')
  })
  }
  )
  
  it('Check if only the 2 items are present', () =>{
    cy.get('[id="HeaderMenu-catalog"]').click()
    cy.get('[id="product-grid"]').find('li').should('have.length', 2)
  })



})


context("Sorting in the catalog works correctly",() => {

    it(('Check sorting price ascending'), () => {
          cy.get('[id="HeaderMenu-catalog"]').click()
          cy.get('select#SortBy').select('price-ascending') 
          cy.get('[id="product-grid"]').get('h3').eq(0).contains('Roasted coffee beans 5kg')
          cy.get('[id="product-grid"]').get('h3').eq(2).contains('Blended coffee 5kg')
    }
  )

      it(('Check sorting price descending'), () => {
          cy.get('[id="HeaderMenu-catalog"]').click()
          cy.get('select#SortBy').select('price-descending') 
          cy.get('[id="product-grid"]').get('h3').eq(0).contains('Blended coffee 5kg')
          cy.get('[id="product-grid"]').get('h3').eq(2).contains('Roasted coffee beans 5kg')   
    }
  )


})
context("Detail show the right information",() => {
  it(('Image contains right description'), () => {
      cy.get('[id="HeaderMenu-catalog"]').click()
      cy.get('[id="product-grid"]').find('li').eq(0).click()
      cy.get('div.product__description').contains('RealBeans coffee, ready to brew.')

      cy.get('[id="HeaderMenu-catalog"]').click()
      cy.get('[id="product-grid"]').find('li').eq(1).click()
      cy.get('div.product__description').contains('Our best and sustainable real roasted beans.')
  })
   
    it(('Image contains right price'), () => {
      cy.get('[id="HeaderMenu-catalog"]').click()
      cy.get('[id="product-grid"]').find('li').eq(0).click()
      cy.get('div.price__container').contains('$55.00 USD')

      cy.get('[id="HeaderMenu-catalog"]').click()
      cy.get('[id="product-grid"]').find('li').eq(1).click()
      cy.get('div.price__container').contains('$40.00 USD')
  })

      it(('Image contains right price'), () => {
      cy.get('[id="HeaderMenu-catalog"]').click()
      cy.get('[id="product-grid"]').find('li').eq(0).click()
      cy.get('div.product__media').get('img').eq(0).should('have.attr', 'src').then((src) => {
    expect(src).to.contains('RealBeansBlendBag.png')
  })

      cy.get('[id="HeaderMenu-catalog"]').click()
      cy.get('[id="product-grid"]').find('li').eq(1).click()
      cy.get('div.product__media').get('img').eq(0).should('have.attr', 'src').then((src) => {
        expect(src).to.contains('RealBeansRoastedBag.png')
  })
    })
  })

  context("Home page displays correct information",() => {
        it(('Contains intro text'), () => {
          cy.get('section#shopify-section-template--23702549528612__rich_text_MR9ckD').get('p').contains('Since 1801, RealBeans has roasted premium coffee in Antwerp for Europe’s finest cafes. Ethically sourced beans, crafted with care.')
        })

        it(('Contains correct product list'), () => {
          cy.get('[id=Slider-template--23702549528612__featured_collection]').find('li').eq(0).get('h3').contains('Blended coffee 5kg')
          cy.get('[id=Slider-template--23702549528612__featured_collection]').find('li').eq(1).get('h3').contains('Roasted coffee beans 5kg')
        })
  })
  context("About me page contains correct information",() => {
    it('Contains history paragraph', () => {
      cy.get('a#HeaderMenu-about').click()
      cy.get('div.section-template--23702549626916__rich_text_HbxBXG-padding').contains('From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future. Our beans are roasted in-house, shipped from Antwerp or Stockholm, and loved across the continent.')
    })  
    
  })
})

import React from 'react'
import {Tab, TabList,TabPanel,Tabs} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import BusinessCategory from './BusinessCategory';
import CryptoCategory from './CryptoCategory';
import EntertinmentCategory from './EntertinmentCategory';
import PoliticsCategory from './PoliticsCategory';
import SportCategory from './SportCategory';
export default function CategoriesMain() {
  return (
    <div className=' xs:w-[100vw] xs:h-screen sm:h-screen  sm:w-[470px] md:w-[500px] w-[600px] xl:w-[650px]
    overflow-y-scroll hide-scrollbar xs:mb-7 sm:mb-0 border-x border-x-red-600'>
       <div className='xs:mt-12 md:mt-4'>
        <Tabs  className="px-3">
          <TabList className="flex justify-between px-3  w-[100%] ">
            <Tab className="text-lg font-semibold pb-3 focus:text-purple-500 cursor-pointer focus:outline-none ">Sports</Tab>
            <Tab className="text-lg font-semibold pb-3 focus:text-purple-500 cursor-pointer focus:outline-none ">Politics</Tab>
            <Tab className="text-lg font-semibold pb-3 focus:text-purple-500 cursor-pointer focus:outline-none">Business</Tab>
            <Tab className="text-lg font-semibold pb-3 focus:text-purple-500 cursor-pointer focus:outline-none ">Crypto</Tab>
            <Tab className="text-lg font-semibold pb-3 focus:text-purple-500 cursor-pointer focus:outline-none ">Entertinment</Tab>
            
            
             
          </TabList>
           <TabPanel>
              <SportCategory  />
           </TabPanel>
           <TabPanel>
           <PoliticsCategory  />
           </TabPanel>
           <TabPanel>
           <BusinessCategory  />
           </TabPanel>
           <TabPanel>
           <CryptoCategory  />
           </TabPanel>
           <TabPanel>
         <EntertinmentCategory  />
           </TabPanel>
           
        </Tabs>
    </div>
    </div>
  )
}

import { createContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form } from '@/components/Form';
import { Sql } from '@/components/Sql';

export const FormContext = createContext({})

type FormContextProvider = {
  children: React.ReactNode
}

export function FormContextProvider({ children }: FormContextProvider) {
  
  
  return (
    <FormContext.Provider value={{}}>
      <div className="fixed top-14 left-14 bottom-14 w-[600px] rounded bg-white shadow-md z-[999]" style={{ transform: `translateX(-100%)` }}>
        <Tabs defaultValue="account" className="w-full mx-auto">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger className="" value="account">Alterar Atributos</TabsTrigger>
            <TabsTrigger value="password">SQL</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Form />
          </TabsContent>
          <TabsContent value="password">
            <Sql />
          </TabsContent>
        </Tabs>
      </div>

      {children}
    </FormContext.Provider>
  )
}
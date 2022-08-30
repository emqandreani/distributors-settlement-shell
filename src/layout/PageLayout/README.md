# PageLayout component:

## Descripción:

El componente de diseño `<PageLayout />` tiene por función renderizar un diseño en común para cada sección/página del proyecto. Como tal, se encarga de renderizar un único componente children -a modo de wrapper- y de proveer al diseño de este children un banner ubicado en la parte superior.

## Props:

- `children: JSX.Element`
- `pageName: string`

## Uso:

Como se menciona antes, el componente debe aparecer como `wrapper` de otro componente de la App. 

- Se puede aplicar directamente como contenedor de nuestra página: 

```javascript
const SamplePage = () => {
    return (
        <PageLayout pageName="Sample Page">
            <h1>Sample title</h1>
        </PageLayout>
    )
}
```
- De igual manera, podemos utilizarlo directamente en nuestro componente router (lo cual mejora significativamente la lectura del código):

```javascript
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route
          element={
            <PageLayout pageName="Liquidación">
              <BranchPage />
            </PageLayout>
          }
          path="/sucursal"
        />
      </Routes>
    </BrowserRouter>
  );
};
```

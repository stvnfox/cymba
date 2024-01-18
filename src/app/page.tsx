import { LoginComponent } from '@/components/LoginComponent'

const Home = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-screen">
      <h1 className='text-3xl font-bold tracking-wider mb-8'>Cymba</h1>
      <LoginComponent/>
    </main>
  )
}

export default Home;

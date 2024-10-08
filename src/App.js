// import NavbarNav from './navbar/NavbarNav';
import TablePeminjaman from './table/TablePeminjaman';
import ChartPeminjaman from './chart/ChartPeminjaman';

// Added by febry
import LayoutUI from './new_updated/LayoutUI';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Contents from './new_updated/modules/Contents';

// End added by febry


function App() {

  // Updated by Febry
  return (
      <LayoutUI>
        <Contents />
        {/* <TablePeminjaman/>
        <ChartPeminjaman/> */}
      </LayoutUI>
  );
  // End updated by Febry

  // return (
  //   <div className="App">
  //    <NavbarNav/>
  //    <TablePeminjaman/>
  //    <ChartPeminjaman/>
  //   </div>
  // );
}

export default App;

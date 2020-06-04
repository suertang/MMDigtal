using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp2
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        // Who is going to be next
        private Boolean MyTurn = false;
        private int filled = 0;
        public MainWindow()
        {
            InitializeComponent();
            MyTurn = false;
        }
        private void MainWindow_Loaded(object sender, RoutedEventArgs e) {
            Bind_Click();
        }
        public static IEnumerable<T> FindVisualChildren<T>(DependencyObject depObj) where T : DependencyObject
        {
            if (depObj != null)
            {
                for (int i = 0; i < VisualTreeHelper.GetChildrenCount(depObj); i++)

                {

                    DependencyObject child = VisualTreeHelper.GetChild(depObj, i);

                    if (child != null && child is T)

                    {

                        yield return (T)child;

                    }



                    foreach (T childOfChild in FindVisualChildren<T>(child))
                    {
                        yield return childOfChild;
                    }
                }
            }
        }
        private String GetContentByGrid(int x, int y)
        {
            foreach (Button bt in FindVisualChildren<Button>(this))
            {

                int r = Grid.GetRow(bt);
                int c = Grid.GetColumn(bt);
                if(x==r && c == y)
                {
                    return bt.Content.ToString();
                }
                
            }
            return "";
        }
        /// <summary>
        /// 判断游戏是否结束
        /// </summary>
        /// <param name="ch"></param>
        /// <param name="row"></param>
        /// <param name="col"></param>
        /// <returns></returns>
        private bool isEndGame(String ch, int row, int col)
        {
           
           
            if (ch == GetContentByGrid(row, (col + 1) % 3) && ch == GetContentByGrid(row, (col + 2) % 3))
            {
                //RowFail = false;
                return true;
            }
            if (ch == GetContentByGrid((row+1) % 3, col) && ch == GetContentByGrid((row + 2) % 3, col))
            {
                //RowFail = false;
                return true;
            }
            // 需要考虑对角线的情况
            if ((row + col) % 2 ==0)
            {
                int[] nextRows = { -1, -1 };
                int[] nextCols = { -1, -1 };
                if (row == 0) {
                    nextRows[0] = row + 1;
                    nextRows[1] = row + 2;
                }
                if (row == 2) {
                    nextRows[0] = row - 1;
                    nextRows[1] = row - 2;
                }
                if (col == 0)
                {
                    nextCols[0] = col + 1;
                    nextCols[1] = col + 2;
                }
                if (col == 2)
                {
                    nextCols[0] = col - 1;
                    nextCols[1] = col - 2;
                }
                if (ch == GetContentByGrid(nextRows[0], nextCols[0]) && ch == GetContentByGrid(nextRows[1], nextCols[1]))
                {
                    //RowFail = false;
                    return true;
                }


                if (row == 1 && col ==1) {
                    nextRows[0] = row - 1;
                    nextRows[1] = row + 1;
                    nextCols[0] = col - 1;
                    nextCols[1] = col + 1;
                    if (ch == GetContentByGrid(nextRows[0], nextCols[0]) && ch == GetContentByGrid(nextRows[1], nextCols[1]))
                    {
                        //RowFail = false;
                        return true;
                    }
                    if (ch == GetContentByGrid(nextRows[0], nextCols[1]) && ch == GetContentByGrid(nextRows[1], nextCols[0]))
                    {
                        //RowFail = false;
                        return true;
                    }
                }
                
            }

            //Grid.ColumnProperty(1, 2);
            //Grid.GetColumn
            // 如果所有的按钮都有值
           
            return false;
        }
        private void Show_Content(object sender, RoutedEventArgs e) {
            Button btn = sender as Button;
            String ch = "X";
            if ("" == btn.Content.ToString())
            {

                filled++;
                ch = MyTurn ? "X" : "O";

                btn.Content = ch;
                BrushConverter brushConverter = new BrushConverter();
                Brush brush = (Brush)brushConverter.ConvertFromString(MyTurn ? "Green" : "Red");
                btn.Foreground = brush;
                MyTurn = !MyTurn;
                
                int r = Grid.GetRow(btn);
                int c = Grid.GetColumn(btn);
                
                if (isEndGame(ch, r, c))
                {
                    //Console.WriteLine("游戏结束!");
                    
                   
                        MessageBox.Show($"游戏结束! {ch} 赢得了游戏。");
                   
                    
                    // 重新初始化
                    Bind_Click();
                }
                else if (filled >= 9)
                {
                    MessageBox.Show($"游戏结束! 平局");
                    Bind_Click();
                }

            }
            else
            {
                btn.Click -= new RoutedEventHandler(Show_Content);
            }
            
            //MessageBox.Show($"此按钮的内容 : {btn.Content as String}.");
        }
        private void Bind_Click() {
            //int btnCount = 0;
            filled = 0;
            foreach (Button bt in FindVisualChildren<Button>(this))
            {
                // do something with tb here
                bt.Content = "";
                try
                {
                    bt.Click -= new RoutedEventHandler(Show_Content);
                }
                catch (Exception e) {
                    Console.WriteLine(e.ToString());
                }
                bt.Click += new RoutedEventHandler(Show_Content);
                //btnCount++;
            }
            MyTurn = false;
            //MessageBox.Show($"当前窗口总共有 {btnCount.ToString()} 个 按钮。");
        }
        private void Btn00_Click(object sender, RoutedEventArgs e)
        {
            Button btn = sender as Button;
            MessageBox.Show(btn.Content as String);
            //int ContorlsCount = VisualTreeHelper.GetChildrenCount(this);
            //MessageBox.Show($"Hello Contorls count in this : {ContorlsCount.ToString()}");
        }
    }
}

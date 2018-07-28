class AnimalSaga
{
    constructor()
    {
        this.SIZE = 9;
        this.blocks = ['A', 'B', 'C', 'D', 'E' ,'F' ,'G'];
        this.container = document.querySelector(".game");
        this.board = [];
        
        for (let i = 0; i < this.SIZE; i++)
        {
            this.board[i] = []
            
            for (let j = 0; j < this.SIZE; j++)
            {
                let randomIdx = Math.floor(Math.random() * this.blocks.length);
                
                this.board[i][j] = this.blocks[randomIdx];
            }
        }
    }
    
    render()
    {
        this.container.innerHTML = '';
        this.board.forEach((row, r) => {
            row.forEach((col, c) => {
                this.createBtn(col, r, c);
            });
        });
    }
    
    createBtn(content, r, c)
    {
        let btn = document.createElement("button");
        btn.innerText = content;
        btn.addEventListener('click', ()=>{
            this.onBtnClick(r, c);
        });
        this.container.appendChild(btn);
    }
    
    onBtnClick(r, c)
    {
        this.locked = true;
        this.remove(this.board[r][c]. r, c);
        this.render();
        setTimeout(() => {}, 1000);
    }
    
    fall()
    {
        for (let r = this.SIZE - 1; r >= 0; r--)
        {
            for (let c = 0; c < this.SIZE; c++)
            {
                if (this.board[r][c] == '')
                {
                    this.board[r][c] = this.board[r-1][c];
                    this.board[r-1][c] = '';
                    
                    this.animate(r-1, c);
                }
            }
        }
        
        for (let c = 0; c < this.SIZE; c++)
        {
            if (this.board[0][c] === '')
            {
                let randomIdx = Math.floor(Math.random() * this.blocks.length);
                this.board[0][c] = this.blocks[randomIdx];
            }
        }
        
        this.render();
        
        if (this.doesZeroExist())
        {
            setTimeout(this.fall.bind(this), 1000);
        }
        else
        {
            this.locked = false;
        }
    }
    
    doesZeroExist ()
    {
        for (let r = 0; r < this.SIZE; r++)
        {
            for (let c = 0; c < this.SIZE; c++)
            {
                if (this.board[r][c] === '')
                {
                    return true;
                }
            }
            return false;
        }
    }
    
    remove(blockType, r, c)
    {
        if (r < 0 || r >= this.SIZE)
        {
            return;
        }
        if (c < 0 || c >= this.SIZE)
        {
            return;
        }
        if (this.board[r][c] !== blockType)
        {
            return;
        }
        
        this.board[r][c] = '';
        
        this.remove(blockType, r-1, c);
        this.remove(blockType, r+1, c);
        this.remove(blockType, r, c-1);
        this.remove(blockType, r, c+1);
    }
    
    animate(r, c)
    {
        let btn = document.querySelectorAll("div")[r * this.SIZE+c];
        console.log(btn);
        btn.style.animation = "fall 1s";
    }
}


new AnimalSaga().render();

//https://github.com/dnkm/portfolio-1
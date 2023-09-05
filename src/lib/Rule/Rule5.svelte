<div >
    <p>Ex.สมมติเรากรอกค่าในแต่ละช่อง input เป็นดังนี้</p>
</div> 
<div class="flex flex-col items-start justify-around h-400 w-1000 my-5">
    <div class="form-control my-5">
        <label class="label">
        <span class="label-text text-red-500">
            โปรดใส่จำนวนเต็มตั้งแต่ 2-10
        </span>
        </label>
        <label class="input-group">
            <span>จำนวนเลขที่สามารถนับได้มากสุดในแต่ละตา</span>
        <input
            type="text"
            placeholder="3"
            class="input input-bordered" 
            disabled
        />
        </label>
    </div>
    <div class="form-control my-5">
        <label class="label">
            <span class="label-text text-red-500">
                โปรดใส่จำนวนเต็มตั้งแต่ 3-100
            </span>
        </label>
        <label class="input-group">
            <span>เลขสุดท้ายของเกม</span>
            <input
            type="text"
            placeholder="20"
            class="input input-bordered" 
            disabled
            />
        </label>
    </div>
    <div class="form-control my-5">
        <label class="label">
            <span class="label-text text-red-500">
                โปรดเลือกผลของเกม
            </span>
        </label>
        <label class="input-group">
            <span>เมื่อผู้เล่นนับถึงเลขสุดท้าย กำหนดให้</span>
            <select class="select select-bordered" disabled>
                <option value="lose">แพ้</option>
                <option value="win">ชนะ</option>
            </select>
        </label>
    </div>
</div>
<div >
    <p>หมายความว่า ในเกมนี้ผู้เล่นจะนับเลขไปเรื่อย ๆ โดยในแต่ละตาสามารถเลือกนับได้ตั้งแต่ 1-3 (1,2,3) โดยผู้เล่นที่นับถึงเลข 20 จะเป็นผู้แพ้</p>
</div> 
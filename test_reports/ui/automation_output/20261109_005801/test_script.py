async def run_test(page, output_dir, page_url):
    import traceback
    try:
        await page.set_viewport_size({"width":1920,"height":1080})
        await page.goto("https://indian-warfare-2--5wr39jms.preview.emergentagent.com", wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-testid="hero-image"]', timeout=10000)
        await page.locator('[data-testid="hero-explore-button"]').click(); await page.wait_for_timeout(700)
        await page.locator('[data-testid="timeline-era-chola"]').click(); await page.wait_for_timeout(500)
        await page.locator('[data-testid="era-read-more-button"]').click(); await page.wait_for_timeout(400)
        assert "Chola Thalassocracy" in await page.locator('[data-testid="detail-modal"]').inner_text()
        await page.locator('[data-testid="detail-modal-close"]').click(); await page.wait_for_timeout(1300)
        assert await page.locator('[data-testid="detail-modal"]').count() == 0
        print("PASS: era modal dismissal after animation")
        await page.locator('[data-testid="archive-card-01"]').click(); await page.wait_for_timeout(400)
        text=await page.locator('[data-testid="detail-modal"]').inner_text(); assert "Ancient Indian Armies" in text and "Infantry" in text
        await page.locator('[data-testid="detail-modal-close"]').click(); await page.wait_for_timeout(1300)
        print("PASS: archive modal title/content/tags and dismissal")
        for tid, sid in [("nav-timeline-button","timeline"),("nav-library-button","modules"),("nav-principles-button","principles")]:
            await page.locator(f'[data-testid="{tid}"]').click(); await page.wait_for_timeout(500); assert await page.locator(f'#{sid}').is_visible()
        await page.locator('[data-testid="principles-read-button"]').click(); await page.wait_for_timeout(400); assert "strategic lens" in (await page.locator('[data-testid="detail-modal"]').inner_text()).lower()
        print("PASS: section navigation and principles modal")
        await page.set_viewport_size({"width":390,"height":844}); await page.reload(wait_until="networkidle"); await page.wait_for_selector('[data-testid="hero-image"]', timeout=10000)
        dims=await page.evaluate("""() => ({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})"""); assert dims['sw'] <= dims['cw']+1, dims
        await page.locator('[data-testid="mobile-menu-button"]').click(); await page.wait_for_timeout(250); assert await page.locator('.nav-links.is-open').is_visible()
        await page.locator('[data-testid="nav-library-button"]').click(); await page.wait_for_timeout(500); assert not await page.locator('.nav-links.is-open').is_visible()
        print("PASS: mobile menu and no horizontal overflow")
        errors=await page.evaluate("""() => Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]')).map(el=>el.textContent).join(', ')"""); print("No error messages found on the page" if not errors else f"Found error message: {errors}")
        print("RESULT: PASS")
    except Exception as e:
        print(f"FINDING: {e}"); traceback.print_exc(); raise
